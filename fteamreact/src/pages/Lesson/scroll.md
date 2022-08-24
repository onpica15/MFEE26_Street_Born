<Scroll.Element className="products-card-scroll">
                      {productCartItems.map((v, i) => {
                        return (
                          <ProductCard
                            key={v.sid}
                            singleItem={v}
                            singleInd={i}
                            productCartItems={productCartItems}
                            setProductCartItems={setProductCartItems}
                            dep={dep}
                            setDep={setDep}
                            allChecked={allChecked}
                            setAllChecked={setAllChecked}
                          />
                        );
                      })}
                    </Scroll.Element>