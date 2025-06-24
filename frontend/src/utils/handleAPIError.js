export const handleAPIError = (error) => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response?.status;
            const errors = error.response?.data?.errors;
            
            errors.forEach(err => {toast.error(`${err.attr ? err.attr : '' + ':'} ${err.detail}`)});
        }
    } else {
    toast.error("An unexpected error ocurred")
    }
}