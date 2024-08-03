import type { Toast, Toaster } from "~/types/toast"

export const useToasterStore = defineStore('toaster', () => {
    const toastId = ref(0)
    const toaster: Ref<Array<Toaster>> = ref([])
    const getToaster = computed(() => toaster.value)

    function addToast(toast: Toast) {
        const currentToastId = toastId.value
        toaster.value.unshift({
            id: currentToastId,
            state: 'appear',
            toast
        })

        toastId.value++
        setDissappear(currentToastId)
    }
    function setDissappear(currentToastId: number) {
        setTimeout(() => {
            const currentToastPosition = toaster.value.findIndex(toast => toast.id === currentToastId)
            if(currentToastPosition !== -1) {
                toaster.value[currentToastPosition].state = 'disappear'
                removeToast(currentToastId)
            }
        }, 5000)
    }
    function removeToast(currentToastId: number) {
        setTimeout(() => {
            const currentToastPosition = toaster.value.findIndex(toast => toast.id === currentToastId)
            if(currentToastPosition !== -1) {
                toaster.value.splice(currentToastPosition, 1)
            }
        }, 2000)
    }
  
    return { getToaster, addToast }
  })