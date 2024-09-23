import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const useUpdateProfile = () => {
    const queryClient=useQueryClient();
    const {mutateAsync:updateProfile,isLoading:isUpdatingProfile}=useMutation({
		mutationFn:async(formData)=>{
            try{
               const res=await fetch(`/api/user/update`,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify(formData)
			   });
			   const data=await res.json();
               if (!res.ok) throw new Error (data.message || "Something went wrong");
               return data;
			}catch(error){
				throw new Error(error.message);
			}
		},
		onSuccess:()=>{
			toast.success("profile updated successfully")
			Promise.all([
                 queryClient.invalidateQueries({queryKey:["authUser"]}),
                 queryClient.invalidateQueries({queryKey:["userProfile"]})
			])
		},
		onError:(error)=>{
           toast.error(error.message);
		}
	})
    return {updateProfile,isUpdatingProfile}
}

export default useUpdateProfile
