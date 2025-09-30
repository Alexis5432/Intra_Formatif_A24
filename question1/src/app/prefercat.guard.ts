import { inject } from "@angular/core";
import { CanActivateFn, createUrlTreeFromSnapshot } from "@angular/router";
import { UserService } from "./user.service";
export const prefercatGuard: CanActivateFn = (route, state) => {
  // On inject le service pour regarder si l'utilisateur est connecté
  const userService = inject(UserService);
  if (!userService.currentUser) 
    return createUrlTreeFromSnapshot(route, ["/login"]);
  if (userService.currentUser.prefercat === false)
    return createUrlTreeFromSnapshot(route, ["/dog"]);
  else return true;
};