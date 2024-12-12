import React from "react";

function Main_Page({ children, ...props }) {
   
        
          return (
            <>
              <CenterBlock>
                <WidthBlock>
                  <div className={classes.headerContainer1}>
                    <div className={classes.location}>
                      <img src="/images/location.png" alt="Location" />
                      <span className={classes.cityName}>{selectedCity}</span>
                      <select
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className={classes.citySelect}
                      >
                        {cities.map((city) => (
                          <option key={city.value} value={city.value}>
                            {city.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <ul className={classes.navone}>
                      <li>
                        <Link to="/catalog">Каталог</Link>
                      </li>
                      <li>
                        <Link to="/news">Новости</Link>
                      </li>
                      <li>
                        <Link to="/solutions">Готовые решения для бизнеса</Link>
                      </li>
                      <li>
                        <Link to="/company">О компании</Link>
                      </li>
                    </ul>
                    <div className={classes.call}>
                      <img src="/images/coolicon.png" alt="Call" />
                      <h4 className={classes.phone}>8-928-380-41-46</h4>
                    </div>
                  </div>
                  <div className={classes.headerContainer2}>
                    <div className={classes.houseName}>
                      <img
                        src="/images/home.png"
                        alt="Home"
                        onClick={() => navigate('/')}
                      />
                    </div>
                    <div className={classes.search}>
                      <input
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="Поиск по товарам"
                        onFocus={() => searchQuery && setIsDropdownVisible(true)}
                      />
                      {/* <button className={classes.searchImg}>
                        <img src="/images/Background.png" alt="Search" />
                      </button> */}
                      {isDropdownVisible && (
                        <div className={classes.searchDropdown}>
                          {searchResults.length > 0 ? (
                            <ul>
                              {searchResults.map((item) => (
                                <li
                                  className={classes.searchLi}
                                  key={item.id}
                                  onClick={() => {
                                    navigate(`/product/${item.id}`); // Переход на страницу товара
                                    setSearchQuery(''); // Очищаем инпут
                                    setIsDropdownVisible(false); // Закрываем выпадающий список
                                  }}
                                >
                                  {item.name}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>Ничего не найдено</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={classes.buttons}>
                      {userData ? (
                        <>
                          <button>
                            <img
                              src="/images/cartHeader.png"
                              alt="Корзина"
                              onClick={() => navigate('/basket')}
                            />
                            <span>Корзина</span>
                          </button>
                          <button type="button" onClick={openModal}>
                            <img src="images/Vector.png" alt="User" />
                            <span>{userData.name.split(' ')[0]}</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => navigate('/registration')}
                          >
                            <img src="images/Vector.png" alt="User" />
                            <span>Регистрация</span>
                          </button>
                          <button type="button" onClick={() => navigate('/login')}>
                            <img src="images/Vector.png" alt="User" />
                            <span>Войти</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </WidthBlock>
              </CenterBlock>
              <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className={classes.modal}
                overlayClassName={classes.overlay}
                shouldCloseOnOverlayClick={true}
              >
                <div className={classes.modalContent}>
                  {userData ? (
                    <>
                      <div className={classes.name}>
                        <span>Имя: {userData.name}</span>
                        <span>Email: {userData.email}</span>
                      </div>
                      <div className={classes.modalButtons}>
                        <button type="button" onClick={() => navigate('/profile')}>
                          <img src="/images/Vector.png" alt="Profile" />
                          <span>Мой профиль</span>
                        </button>
                        <button type="button" onClick={handleLogout}>
                          <img src="/images/exit.png" alt="Logout" />
                          <span>Выйти</span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <p>
                      Вы не авторизованы. <Link to="/login">Войти</Link>
                    </p>
                  )}
                </div>
              </Modal>
              <div className={classes.greenLine}>
                <CenterBlock>
                  <WidthBlock>
                    <ul>
                      {categories.slice(0, 5).map((el) => (
                        <Link
                          to={`/category/${el.id}`}
                          className={classes.link}
                          key={el.id}
                        >
                          {el.title}
                        </Link>
                      ))}
                    </ul>
                  </WidthBlock>
                </CenterBlock>
              </div>
            </>
          );
        }
        
        export default Header;
        
     );
}

export default Main_Page;