import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

const useFollow = () => {
  const queryClient=useQueryClient();

  const {mutate:follow,isPending}=useMutation({
    mutationFn:async(userId)=>{
         const res=await fetch(`/api/user/follow/${userId}`,{
            method:"POST"
         })
         const data=await res.json();
         if(!res.ok) throw new Error(data.message || "Something went wrong")
        return;
    },
    onSuccess:()=>{
          Promise.all([
            queryClient.invalidateQueries({queryKey:["suggestedUsers"]}),
            queryClient.invalidateQueries({queryKey:["authUser"]})
          ])
    },
    onError:(error)=>{
      toast.error(error.message)
    }
  })

  return {follow,isPending}

}

export default useFollow
