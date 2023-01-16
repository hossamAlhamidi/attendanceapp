

export const useAuthPermission = ()=>{
    const {instructor_id,is_admin} = JSON.parse(localStorage.getItem('user'));
    return{
        is_admin:is_admin==0?false:true,
        instructor_id:instructor_id
    }
}