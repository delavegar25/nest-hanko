import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-res';
import { promisify } from 'util';
import * as jwt from 'express-jwt'


@Injectable()
export class AuthorizaionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.getArgByIndex[0];
    const res = context.getArgByIndex[1];

    const checkJwt = promisify(
      jwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksReuestsPerMinute: 5,
          jwksUri: '',
        }),
        audience: '',
        issuer: '',
        algorithms: [ 'RS256' ]     
      })
    );
    try{
      await checkJwt(req, res);
      return true;
    }catch(error) {
      throw new UnauthorizedException(error);
    }
  }
}