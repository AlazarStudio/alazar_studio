import React from 'react';
import classes from './OneProductPage.module.css';
import CenterBlock from '../../Standart/CenterBlock/CenterBlock';
import WidthBlock from '../../Standart/WidthBlock/WidthBlock';



function OneProductPage({ children, ...props }) {
    
  return (
    <>
      <CenterBlock>
        <WidthBlock>
          <div className={classes.container}>
            <div className={classes.containerTop}>
              <div className={classes.containerTopLeft}>
                <span>Создание фирменного стиля для</span>
                <span>LUNA</span>
                <span>Салон красоты</span>
              </div>
              <div className={classes.containerTopRight}>
                <img src='/images/test.png'/>
              </div>
            </div>

            Lorem ipsum dolor, sit amet consectetur adipisicing elit. A velit totam, ipsa rem optio quod minus nostrum provident quis atque quam vero, voluptatem tempora commodi vitae. Quia, nobis tempore culpa doloribus, voluptatum cupiditate commodi optio recusandae, cum veritatis suscipit magnam soluta. Totam repellendus nemo quo, similique aut consequatur necessitatibus aliquid, mollitia doloribus consequuntur eligendi nihil. Architecto distinctio, nam nesciunt similique veritatis amet, harum iusto rerum eaque velit repellendus quisquam eveniet? Qui suscipit fugiat corporis! Aspernatur quasi quisquam atque optio iusto quae, ex assumenda, laudantium veritatis nostrum odio cumque. Minus accusamus praesentium inventore sint hic ab eligendi. Tempore reiciendis eveniet ab id, excepturi blanditiis culpa, quo accusamus, odio maxime magnam eligendi ipsam. Officiis quaerat explicabo quibusdam. Maiores consequuntur delectus in maxime, libero ipsum mollitia aliquam quos deleniti aliquid praesentium fugit obcaecati qui reiciendis nam iure quidem voluptate neque eaque! Suscipit iure nostrum exercitationem odio earum. Tenetur, nostrum in doloribus alias eos incidunt distinctio nemo non eius quis delectus libero odit ab accusantium deleniti sed eum fugit veritatis hic. Adipisci enim deserunt optio repudiandae dolor nobis debitis porro sint fugiat eveniet pariatur, explicabo magnam voluptatum eaque perspiciatis nostrum velit, excepturi exercitationem illo ipsam maiores. Suscipit incidunt doloribus hic neque, dignissimos expedita ipsa distinctio aperiam facilis assumenda obcaecati ea cumque magni reprehenderit, nemo quidem dolore sit tempora tempore ipsum maiores autem. Aperiam deserunt temporibus eaque maiores magni sint dolore, ipsum mollitia? Sit nihil quas corporis magni necessitatibus nobis, beatae sequi nam. Cumque dignissimos dolorem accusamus similique, unde placeat officiis, magnam nam ratione, praesentium sint quam voluptas ullam magni et iusto tempore est aut. Magnam quidem omnis ab. Laboriosam eum ducimus temporibus odit, esse quibusdam saepe quas iure ex optio quod nam odio veniam magnam adipisci dolores. Maxime qui ipsum pariatur ea vitae voluptate in aliquid incidunt, fugiat neque excepturi ipsam tempora corrupti iure facilis reprehenderit. Optio obcaecati quos corrupti vitae veniam accusantium id et quisquam saepe ipsum libero, aliquid totam. Voluptates corrupti quod repellat eaque accusantium ullam hic, iste nesciunt tenetur facilis molestias! Eum, earum odio unde pariatur quibusdam, rem cumque voluptate animi reiciendis dolore quaerat libero minus laboriosam architecto eaque laudantium voluptatum incidunt, at repellendus quis labore beatae. Ducimus autem laboriosam maxime nostrum provident inventore distinctio voluptatum molestiae adipisci aperiam enim perferendis consequuntur ipsum pariatur, placeat nihil quam doloribus repellendus numquam, nam, ullam corporis beatae eius facere? Consequuntur suscipit at rem odio, recusandae officia ipsum quas unde quae reiciendis soluta error omnis, qui totam eaque deserunt nam perspiciatis facilis dicta vero magnam beatae. Tenetur facilis, perspiciatis eaque reiciendis voluptatum consectetur? Assumenda culpa, veniam adipisci placeat nihil ipsa eum impedit perspiciatis harum aspernatur repudiandae fugit et veritatis, dolorum laudantium iste odio ab? Tempora corporis repudiandae ratione, voluptates hic illum laborum praesentium consectetur itaque vel nisi sequi quae recusandae nulla provident sed possimus ea sunt. Optio, adipisci. Commodi, maiores modi sapiente dolores iste repudiandae in, possimus, dolore ut quos praesentium asperiores veniam laboriosam eveniet nam est necessitatibus laudantium autem eius perspiciatis quasi quia deleniti earum natus! Fugit quas cupiditate esse rem minus, ullam ea.
            <div className={classes.containerBottom}>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
                <span>ЛОГОТИП И ФИРСТИЛЬ</span>
            </div>
            <div className={classes.containerImg}>
            <img src='/images/test2.png'/>
            <img src='/images/test1.png'/>
            </div>
          </div>
        </WidthBlock>
      </CenterBlock>
    </>
  );
}


export default OneProductPage;
