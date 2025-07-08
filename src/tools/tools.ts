import {loggedIn} from '../globalState/state.ts';
import type { Router } from 'vue-router';
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export function timeAgo(dateInput: string | Date): string {
  const now: Date = new Date();
  const pastDate: Date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  const diffInMs: number = now.getTime() - pastDate.getTime();
  const msInDay: number = 1000 * 60 * 60 * 24;
  const diffInDays: number = Math.floor(diffInMs / msInDay);

  return diffInDays === 0
    ? "Today"
    : diffInDays === 1
    ? "1 day ago"
    : `${diffInDays} days ago`;
}

export const fileHandler = async (event: Event): Promise<{error: string; payload: string}> => {
    const result = {
        error:'Error',
        payload:''
    };
    const target = event.target as HTMLInputElement;
    if(target.files && target.files[0]){
        const image = target.files[0];
        if(target.files[0].size > 1293348){
            result.error = 'Image must be smaller than 1MB';
            return result;
        };
        if(target.files[0].type != 'image/jpeg' && target.files[0].type != 'image/png'){
            result.error = 'Image is not JPEG or PNG';
            return result;
        };

        const base64 = await new Promise<string>(function(res, rej){
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = function(){
                if(reader.result){
                    res(reader.result as string);
                }else{
                    rej('fail')
                };
            };
        });

        result.error = '';
        result.payload = base64;
        return result
    }
    return result
};

export const auth = async function (router: Router, email?: string) {
    const result = await fetch(baseUrl + '/auth', {
        credentials: 'include' as RequestCredentials,
    })
    const response = await result.json();
    if(email){
        return response;
    }
    if (!response.authenticated) {
        router.push('/')
    } else {
        loggedIn.value = response.authenticated;
        return response;
    }
}
