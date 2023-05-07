
let counter = 20;
let data="I am at client before fetch";

async function getData()
{
    console.log(data);
    let rspn = await fetch("http://localhost:5001/books/data")
    console.log(rspn);
    data = await rspn.json();
    console.log(data);
    return data;
}

async function createBookCard()//count,d)
{
    console.log('Salam Hindusthan !!!');
    data= await getData();
    for(count=0; count<counter;++count){

    let root = document.getElementById("imageRoot");
    let sect = document.createElement("section");
    let tempDiv=root;
    sect.setAttribute("class", 'featured');
    sect.setAttribute("id", 'featured');
    tempDiv.appendChild(sect);
    tempDiv=sect;

    divClassToSet = ['swiper featured-slider', 'swiper-wrapper', 'swiper-slide box', ""];

    for(i=0;i<divClassToSet.length;++i)
    {
        tempEle = document.createElement('div');
        tempDiv.appendChild(tempEle);   
        if(i!=3)
            tempEle.setAttribute("class",divClassToSet[i]);
        
        if(i==3)
            tempEle.setAttribute("id",`actualCard${count}`);
        
        tempDiv =tempEle;
    }

    divClassToSet = ["icons","image","content"];
    iconClassToSet = ['fas fa-search','fas fa-heart',"fas fa-eye"];
    let t, et;
    for(i=0;i<divClassToSet.length;++i)
    {
        tempEle = document.createElement('div');
        tempDiv.appendChild(tempEle);   
        tempEle.setAttribute("class",divClassToSet[i]);
        
        if (i==0)
        {
            tempEle.setAttribute("id",`imgIcons${count}`);
        }
        
        if (i==1)
        {
            tempEle.setAttribute("id",`imgURL${count}`);
            t=document.createElement('img');
            tempEle.appendChild(t);
            t.setAttribute("src",`${data[count].thumbnail}`);
        }

        if (i==2)
        {
            tempEle.setAttribute("id",`bkCntnt${count}`);

            t=document.createElement('h3');
            tempEle.appendChild(t);
            t.appendChild(document.createTextNode(`${data[count].title}`));

            t=document.createElement('h3');
            tempEle.appendChild(t);
            t.appendChild(document.createTextNode(`${data[count].authors}`));
            
            t=document.createElement('div');
            tempEle.appendChild(t);
            t.setAttribute("class",'price');
            t.setAttribute("id",`price${count}`);
            t.innerText=`${(data[count].num_pages * 2 ) / 5}`;

            et=document.createElement('span');
            t.appendChild(et);

            t=document.createElement('a');
            tempEle.appendChild(t);
            t.setAttribute("onclick",`sendToCart('${data[count].isbn10}')`);
            t.setAttribute("id",`${data[count].isbn10}`);
            t.setAttribute("class","btn");
            t.innerText="Add To Cart";
        }
    }

    tempEle = document.getElementById(`imgIcons${count}`);
    for(j=0;j<3;++j)
    {
        t = document.createElement('a');
        tempEle.appendChild(t);
        t.setAttribute("href",`{fetchedValue}`);
        t.setAttribute("class",iconClassToSet[j]);
    }
}
}

// async function displayBooks()
// {
//     let data = await getData();
//     console.log("I am in getData()");
//     for(i=0;i<counter;++i)
//     {   
//         createBookCard(i, data);
//     }
// }

function sendToCart(itemId)
{
    let itemDetails = document.getElementById(itemId);
    console.log(itemDetails.id);
}
