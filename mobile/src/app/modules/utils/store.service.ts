import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Store {
  public get(key: string): any {
    return localStorage.getItem(key)
  }

  public set(key: string, value: string): any {
    return localStorage.setItem(key, value)
  }

  public async getUserInfo(): Promise<any> {
    return {
        username: await this.get('username'),
        uid: await this.get('uid'),
        token: await this.get('token'),
    }
  }

  public async setUserInfo(username: string, 
    uid: string, token: string): Promise<void> {
    await this.set('username', username)
    await this.set('uid', uid)
    await this.set('token', token)
    return this.getUserInfo()
  }

  public revokeSession(): void {
      localStorage.removeItem('username')
      localStorage.removeItem('uid')
      localStorage.removeItem('token')
  }
}
