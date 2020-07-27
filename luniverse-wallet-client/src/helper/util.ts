export const alertErr = (e: any) => {//엑시오스 인터셉트 에러 로직 추가
    if (e.response) {
        alert(e.response.data.message);
    } else {
        alert(e.message);
    }
};