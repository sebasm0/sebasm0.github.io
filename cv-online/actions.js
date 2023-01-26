// THANK-TO: https://randomuser.me/
// THANK-TO: https://stackoverflow.com/questions/48728173/how-do-i-fix-cors-issue-in-fetch-api
// THANK-TO: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// THANK-TO: https://www.tutorialspoint.com/Add-elements-to-a-Dictionary-in-Javascript

const ids=['fullname','picture','phone','email','address',];

const api={
    url:'https://randomuser.me/api/',
    reader:function(data){

        let ret=[];
        const res=data.results[0];
        ret.email=res.email;
        ret.phone=res.phone;
        ret.fullname=res.name.first+" "+res.name.last;
        ret.picture=res.picture.thumbnail;
        ret.address=res.location.city+" "+res.location.country;
        return ret;
    },
};

const update_localStore=function(data) {
    for(let id of ids){
        if(data.hasOwnProperty(id) ){
            localStorage.setItem(id,data[id]);
        } else {
            console.log('data has no property id='+id+' , data='+data);
        }
    }
    return data;
}


const retrieve_data_from_localStore=function(){
    let ret=[];
    if( localStorage == null ) {
        return null;
    }
    for(let id  of ids ) {
        const value=localStorage.getItem(id);
        if(value == null ) {
            console.log('Dont such Item for id='+id);
            return null;
        }
        ret[id]=value
    }
    return ret;
}

const populate_cv=function(data){
    for(let id of ids ){
        const elem=document.getElementById(id)
        if( elem === null || elem === undefined ) {
            console.log('dont such element for id='+id);
            continue;
        }
        if(id == 'picture' ){
            elem.src=data[id];
        } else {
            elem.innerText=data[id];
        }
    }
}

const reload=function() {
    fetch(api.url,{mode:'cors'})
        .then((response) => response.json())
        .then((data) => api.reader(data))
        .then((data) => update_localStore(data))
        .then((data) => populate_cv(data));
}

// let data=retrieve_data_from_localStore();

/* if(data == null ) {
    reload();
} else {
    populate_cv(data);
} */

const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});

$(window).scroll(function(){
    if($(document).scrollTop()>=$(document).height()/5)
        $("#spopup").show("slow");else $("#spopup").hide("slow");
});
function closeSPopup(){
    $('#spopup').hide('slow');
}


