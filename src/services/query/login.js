import { useMutation, useQuery } from "react-query";
import {LOGIN,LOGOUT} from "../queryKeys";
import { login,logoutInstructor } from "../api/login";




export const useLogin = (options)=>{
    const {data,mutate,isLoading}=useMutation(login,{
        mutationKey:LOGIN,
        ...options
    });

    return {mutate,data,isLoading}
}

export const useLogoutInstructor = (options)=>{
    const {refetch,isLoading,mutate} = useMutation(logoutInstructor,
        {
            mutationKey:[LOGOUT],
            ...options
        }
    )
    return {refetch,isLoading,mutate}
}