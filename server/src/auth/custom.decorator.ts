import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GetCategorization = createParamDecorator((data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.categorization;
});