import { useMutation, useQuery } from "react-query";
import {LOGIN} from "../queryKeys";
import { login } from "../api/login";




export const useLogin = (options)=>{
    const {data,mutate,isLoading}=useMutation(login,{
        mutationKey:LOGIN,
        ...options
    });

    return {mutate,data,isLoading}
}

