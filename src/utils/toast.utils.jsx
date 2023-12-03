import toast from "react-hot-toast"

export const loadingToast = (toastMessage)=>{
    return toast.loading(toastMessage);
}

export const SuccessToast = (toastMessage)=>{
    return toast.success(toastMessage)
}

export const errorToast = (toastMessage) =>{
return toast.error(toastMessage)
}