import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IdempotencyKey } from "../enitities/idempotency.entity";
import { Repository } from "typeorm";
import { of, tap } from "rxjs";

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(IdempotencyKey)
    private readonly repo: Repository<IdempotencyKey>,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['idempotency-key'];

    if (!key) {
      return next.handle();
    }

    const endpoint = `${req.method}:${req.url}`;
    const existing = await this.repo.findOneBy({ key });

    if (existing) {
      return of(existing.response);
    }

    return next.handle().pipe(
      tap(async response => {
        await this.repo.save({
          key,
          endpoint,
          response,
        });
      }),
    );
  }
}
