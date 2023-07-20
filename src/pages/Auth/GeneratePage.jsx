import React from 'react'

function GeneratePage(props) {

  return (
      <div className="row row_col row_sb h100">
        <div>
          <div className="row center">
            <a href="" className="mr-1 text-dark f-800">Регистрация</a>
            <a href="" className="ml-1 text-grey">Вход</a>
          </div>
          <div className="row row_center row_sb mt-6">
            <h3 className="bolder">Создайте резервный код</h3>
            <div><i className="fa-solid fa-spinner fa-spin"></i></div>
          </div>

          <p className="mt-1"><span className="text-orange">Резервный код - это единственный путь восстановить доступ к аккаунту</span>, случае если Вы забыли или потеряли данные
            для входа. Администраторам и пользователям следует хранить резервный код в безопасном месте.</p>

          <div className="mt-2 row row_col row_center">
            <div className="col-1@xs btn mt-2 active">Сгенерировать код</div>

            <a href="" className="mt-2">
              <span className="small center link line text-dark">Нет, спасибо</span>
            </a>
          </div>
        </div>
        <div className="flex row-1@xs row-1-2@m">
          <div><span className="bold small">Telegram</span>
            <a href="" target="_blank">
              <span className="link f-400">@softbox <i className="text-orange fa-solid fa-clone"></i></span>
            </a>
          </div>
          <div><span className="bold small">Jabber</span>
            <a href="" target="_blank">
              <span className="link f-400">softbox@jabber.ru <i className="text-orange fa-solid fa-clone"></i></span>
            </a>
          </div>
        </div>
      </div>
  )
}

export default GeneratePage
