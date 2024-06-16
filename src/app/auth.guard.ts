import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const isLogged = !!localStorage.getItem('loggedUser');

  if(!isLogged){
       
    alert('please login to continue');
  }
  return isLogged;
};
