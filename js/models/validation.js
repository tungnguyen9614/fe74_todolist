function Validation(){
    this.kiemTraRong = function(value, notiID, mess){
        if(value === ""){
            getEle(notiID).style.display = "block";
            getEle(notiID).innerHTML = mess;
            return false;
        }

        getEle(notiID).style.display = "none";
        getEle(notiID).innerHTML = "";
        return true;

    }

    this.kiemTraTrung = function(value, notiID, mess, arr){
        var exist = false;

        for (var i=0; i<arr.length; i++){
            var task = arr[i];
            if(task.taskName.toLowerCase() === value.toLowerCase()){
                exist = true;
                break;
            }
        }

        if(exist){
            getEle(notiID).style.display = "block";
            getEle(notiID).innerHTML = mess;
            return false;
        }
        getEle(notiID).style.display = "none";
        getEle(notiID).innerHTML = "";
        return true;
    }
}