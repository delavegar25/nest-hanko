import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-res';
import { promisify } from 'util';
import * as jwt from 'express-jwt'
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizaionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      
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
  }
}