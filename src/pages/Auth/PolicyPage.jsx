import React from 'react'
import GoBack from "../../components/UI/GoBack/GoBack.jsx";

function PolicyPage(props) {

  return (
      <div className="policyPage">
        <h1 className="bolder center">Политика конфиденциальности</h1>

        <div className="container">
          <div className="bs-callout bs-callout">
            <ul>
              <li className='mt-2'>Megapics.pm именуемый «Веб-сайт» не использует сторонние сервисы веб-аналитики. При загрузке изображений, все мета-данные изображений будут удалены, название
                изменится на случайное сгенерированное.
              </li >
              <li className='mt-2'>Наш сайт также использует файлы cookie, чтобы опыт пользования Веб-сайтом был комфортным. Это пригодится при следующем посещении сайта. Благодаря файлам cookie
                просмотр становится намного удобнее. Вы можете отказаться от использования файлов cookie, выбрав соответствующие настройки в своем браузере. Однако это может
                повлиять на некоторые функции Веб-сайта.
              </li>
            </ul>
          </div>

          <GoBack />
        </div>
      </div>
  )
}

export default PolicyPage
