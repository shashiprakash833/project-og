import { useState } from "react";
import "./RoutePage.css";
import {
  archiveCards,
  collections,
  menCollections,
  womenCollections,
  menCategories,
  womenCategories,
  pageCopy,
} from "../data/storeData.js";
import PageHero from "../components/ui/PageHero.jsx";
import ProductCard from "../components/ui/ProductCard.jsx";
import NewsletterSection from "../components/sections/NewsletterSection.jsx";

export default function RoutePage({
  page,
  products,
  cart,
  wishlist,
  onNavigate,
  onAddToCart,
  onWishlist,
  onToast,
  onAuthOpen,
  onSubmitOrder,
  user,
  routeParams = {},
}) {
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [shipping, setShipping] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
    upiId: "",
  });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy =
    page === "category-products"
      ? {
          eyebrow: routeParams.gender === "women" ? "Women's" : "Men's",
          title: `${routeParams.title || "Category"}.`,
          copy: `Handpicked ${routeParams.title?.toLowerCase() || "pieces"} for the ${
            routeParams.gender === "women" ? "women's" : "men's"
          } collection.`,
          image:
            routeParams.gender === "women"
              ? "/images/collections/womens/women-hero@2x.png"
              : "/images/collections/mens/men-hero@2x.png",
        }
      : pageCopy[page] || pageCopy.shop;

  const couponMap = {
    OGSAVE: 200,
    OG20: 300,
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPayable = Math.max(0, subtotal - discountValue);
  const isShippingComplete = Object.values(shipping).every((value) =>
    value.trim(),
  );
  const isPaymentComplete =
    paymentMethod === "credit"
      ? paymentDetails.cardNumber.trim() &&
        paymentDetails.expiry.trim() &&
        paymentDetails.cvc.trim() &&
        paymentDetails.nameOnCard.trim()
      : paymentMethod === "upi"
        ? paymentDetails.upiId.trim()
        : true;
  const confirmEnabled =
    isShippingComplete && isPaymentComplete && cart.length > 0;

  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponMessage("Enter a coupon code to apply.");
      return;
    }
    if (couponApplied) {
      setCouponMessage("Coupon already applied.");
      return;
    }
    if (couponMap[code]) {
      setCouponApplied(true);
      setDiscountValue(couponMap[code]);
      setCouponMessage(
        `Coupon applied — ₹${couponMap[code].toLocaleString("en-IN")} off.`,
      );
      return;
    }
    setCouponMessage("Coupon not recognized. Try OGSAVE or OG20.");
  };

  const handleShippingChange = (field, value) => {
    setShipping((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentChange = (field, value) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const orderItems = cart.reduce((acc, item) => {
    const existing = acc.find((entry) => entry.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }
    return acc;
  }, []);

  const handleConfirmOrder = async () => {
    if (!confirmEnabled) {
      setCheckoutError(
        "Complete shipping and payment details before confirming.",
      );
      return;
    }

    if (!user) {
      onAuthOpen("login");
      setCheckoutError("Please sign in to finish your order.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      items: orderItems,
      totalAmount: totalPayable,
      shippingAddress: shipping,
      paymentMethod,
      shippingPhone: shipping.phone,
    };

    const result = await onSubmitOrder(payload);
    setIsSubmitting(false);

    if (!result?.success) {
      setCheckoutError(result?.error || "Order could not be submitted.");
      return;
    }

    setOrderNumber(`OG${String(result.orderId).padStart(6, "0")}`);
    setOrderConfirmed(true);
    setCheckoutError("");
  };

  return (
    <>
      <PageHero
        eyebrow={copy.eyebrow}
        title={copy.title}
        copy={copy.copy}
        image={copy.image}
        actionLabel={page === "about" ? "Shop OG" : "Back Home"}
        onAction={() => onNavigate(page === "about" ? "shop" : "home")}
      />

      {page === "shop" && (
        <section className="route-section">
          <div className="product-grid">
            {products
              .filter((product) => {
                if (routeParams.gender)
                  return product.gender === routeParams.gender;
                return true;
              })
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.some((item) => item.id === product.id)}
                  onAddToCart={onAddToCart}
                  onWishlist={onWishlist}
                />
              ))}
          </div>
        </section>
      )}

      {page === "collections" && (
        <section className="route-section collection-grid">
          {collections.map((item) => (
            <button
              key={item.id}
              className="collection-card highlight-cloth"
              onClick={() => onToast(`${item.title} opened.`)}
            >
              <div
                className="collection-card-bg"
                style={{ backgroundImage: `url(${item.image})` }}
                aria-hidden="true"
              />
              <img
                className="collection-card-focus"
                src={item.image}
                alt={item.title}
              />
              <span>0{item.id}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </button>
          ))}
        </section>
      )}

      {page === "collections-men" && (
        <>
          <section className="route-section category-section">
            <h2 className="category-title">Shop by Category</h2>

            <div className="category-grid">
              {menCategories.map((cat) => (
                <button
                  key={cat.key}
                  className="category-card category-card-visual"
                  onClick={() =>
                    onNavigate({
                      page: "category-products",
                      params: { gender: "men", key: cat.key, title: cat.title },
                    })
                  }
                >
                  <div
                    className="category-card-bg"
                    style={{ backgroundImage: `url(${cat.image})` }}
                    aria-hidden="true"
                  />
                  <img
                    className="category-card-focus"
                    src={cat.image}
                    alt={cat.title}
                  />
                  <span className="category-card-label">{cat.title}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="products-heading">
            <p className="products-tag">OG STREETWEAR</p>
            <h2>Men's Collection</h2>
            <p className="products-subtitle">
              Explore premium fits designed for everyday confidence and street
              culture.
            </p>
          </section>

          <section className="route-section">
            <div className="product-grid">
              {products
                .filter((product) => product.gender === "men")
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.some(
                      (item) => item.id === product.id,
                    )}
                    onAddToCart={onAddToCart}
                    onWishlist={onWishlist}
                  />
                ))}
            </div>
          </section>
        </>
      )}

      {page === "collections-women" && (
        <>
          <section className="route-section category-section">
            <h2 className="category-title">Shop by Category</h2>

            <div className="category-grid">
              {womenCategories.map((cat) => (
                <button
                  key={cat.key}
                  className="category-card category-card-visual"
                  onClick={() =>
                    onNavigate({
                      page: "category-products",
                      params: {
                        gender: "women",
                        key: cat.key,
                        title: cat.title,
                      },
                    })
                  }
                >
                  <div
                    className="category-card-bg"
                    style={{ backgroundImage: `url(${cat.image})` }}
                    aria-hidden="true"
                  />
                  <img
                    className="category-card-focus"
                    src={cat.image}
                    alt={cat.title}
                  />
                  <span className="category-card-label">{cat.title}</span>
                </button>
              ))}
            </div>
          </section>
          <section className="products-heading">
            <p className="products-tag">OG STREETWEAR</p>
            <h2>Women's Collection</h2>
            <p className="products-subtitle">
              Explore premium fits designed for everyday confidence and street
              culture.
            </p>
          </section>

          <section className="route-section">
            <div className="product-grid">
              {products
                .filter((product) => product.gender === "women")
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.some(
                      (item) => item.id === product.id,
                    )}
                    onAddToCart={onAddToCart}
                    onWishlist={onWishlist}
                  />
                ))}
            </div>
          </section>
        </>
      )}

      {page === "category-products" && (
        <>
          <section className="products-heading">
            <p className="products-tag">
              {routeParams.gender === "women" ? "WOMEN'S" : "MEN'S"} · OG
              STREETWEAR
            </p>
            <h2>{routeParams.title || "Category"}</h2>
            <p className="products-subtitle">
              Browse {routeParams.title?.toLowerCase() || "this category"}{" "}
              picked for the{" "}
              {routeParams.gender === "women" ? "women's" : "men's"} collection.
            </p>
            <button
              className="btn outline category-back-btn"
              onClick={() =>
                onNavigate(
                  routeParams.gender === "women"
                    ? "collections-women"
                    : "collections-men",
                )
              }
            >
              ← Back to Categories
            </button>
          </section>

          <section className="route-section">
            {(() => {
              console.log(products);
              console.log(routeParams);
              const categoryProducts = products.filter((product) => {
                return (
                  product.gender.toLowerCase() ===
                    routeParams.gender.toLowerCase() &&
                  product.type.toLowerCase() === routeParams.key.toLowerCase()
                );
              });

              if (!categoryProducts.length) {
                return (
                  <div className="empty-state">
                    <h3>No {routeParams.title} products found.</h3>
                    <p>New pieces for this category are dropping soon.</p>
                    <button
                      onClick={() =>
                        onNavigate({
                          page: "shop",
                          params: { gender: routeParams.gender },
                        })
                      }
                    >
                      Browse All{" "}
                      {routeParams.gender === "women" ? "Women's" : "Men's"}{" "}
                      Products
                    </button>
                  </div>
                );
              }

              return (
                <div className="product-grid">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some(
                        (item) => item.id === product.id,
                      )}
                      onAddToCart={onAddToCart}
                      onWishlist={onWishlist}
                    />
                  ))}
                </div>
              );
            })()}
          </section>
        </>
      )}

      {page === "drops" && (
        <section className="route-section split-route">
          <div>
            <p className="route-eyebrow">Live Drop</p>
            <h2>02 Days 18 Hours Left</h2>
            <span>Grab the current release before the timer burns out.</span>
            <button onClick={() => onToast("Drop reminder set.")}>
              Remind Me
            </button>
          </div>
          <div className="product-grid mini">
            {products.slice(0, 3).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlist.some((item) => item.id === product.id)}
                onAddToCart={onAddToCart}
                onWishlist={onWishlist}
              />
            ))}
          </div>
        </section>
      )}

      {page === "wishlist" && (
        <section className="route-section">
          {wishlist.length ? (
            <>
              <div className="route-header">
                <p className="route-eyebrow">Saved</p>
                <h2>Your Wishlist</h2>
                <span>These are the OG pieces you want to keep an eye on.</span>
              </div>
              <div className="product-grid">
                {wishlist.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.some(
                      (item) => item.id === product.id,
                    )}
                    onAddToCart={onAddToCart}
                    onWishlist={onWishlist}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>Your wishlist is empty.</h3>
              <button onClick={() => onNavigate("shop")}>
                Browse Products
              </button>
            </div>
          )}
        </section>
      )}

      {page === "cart" && (
        <section className="route-section cart-page">
          {orderConfirmed ? (
            <div className="confirmation-panel">
              <div className="confirmation-card">
                <span className="confirmation-badge">Order Confirmed</span>
                <h2>Thank you for shopping with OG.</h2>
                <p>
                  Your order <strong>{orderNumber}</strong> has been placed.
                  We’ll send delivery updates to{" "}
                  {shipping.phone || "your phone"}.
                </p>
                <div className="confirmation-summary">
                  <div className="summary-row">
                    <span>Order #</span>
                    <strong>{orderNumber}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>
                      {shipping.city}, {shipping.state}
                    </span>
                  </div>
                  <div className="summary-row">
                    <span>Payment</span>
                    <span>
                      {paymentMethod === "credit"
                        ? "Card"
                        : paymentMethod === "upi"
                          ? "UPI"
                          : "Cash on Delivery"}
                    </span>
                  </div>
                  <div className="summary-row highlight total-row">
                    <span>Total Paid</span>
                    <strong>₹{totalPayable.toLocaleString("en-IN")}</strong>
                  </div>
                </div>
                <div className="confirmation-actions">
                  <button
                    className="btn primary"
                    onClick={() => onNavigate("shop")}
                  >
                    Continue Shopping
                  </button>
                  <button
                    className="btn outline"
                    onClick={() => setOrderConfirmed(false)}
                  >
                    View Cart
                  </button>
                </div>
              </div>
            </div>
          ) : cart.length ? (
            <>
              <div className="route-header">
                <p className="route-eyebrow">Cart</p>
                <h2>Your Bag</h2>
                <span>
                  Review the products ready to ship from your current order.
                </span>
              </div>
              <div className="cart-layout">
                <div className="cart-items-panel">
                  {cart.map((product, index) => (
                    <div
                      className="cart-item-card"
                      key={`${product.id}-${index}`}
                    >
                      <img src={product.image} alt={product.name} />
                      <div className="cart-item-details">
                        <div>
                          <span className="item-tag">
                            {product.tag || "OG"}
                          </span>
                          <h3>{product.name}</h3>
                          <p className="item-meta">
                            Size: {product.size || "M"} • Color:{" "}
                            {product.color || "Black"}
                          </p>
                        </div>
                        <div className="item-price">
                          ₹{product.price.toLocaleString("en-IN")}
                        </div>
                      </div>
                      <div className="cart-item-actions">
                        <button onClick={() => onAddToCart(product)}>
                          Add again
                        </button>
                        <button onClick={() => onWishlist(product)}>
                          {wishlist.some((item) => item.id === product.id)
                            ? "Wishlisted"
                            : "Save"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <aside className="cart-checkout-panel">
                  <div className="checkout-box">
                    <h3>Order Summary</h3>
                    <div className="summary-row">
                      <span>Items ({cart.length})</span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="summary-row highlight">
                      <span>Discount</span>
                      <span>-₹{discountValue.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery</span>
                      <span>Free</span>
                    </div>
                    <div className="summary-row total-row">
                      <strong>Total</strong>
                      <strong>₹{totalPayable.toLocaleString("en-IN")}</strong>
                    </div>

                    <div className="coupon-panel">
                      <label>Coupon Code</label>
                      <div className="coupon-row">
                        <input
                          className="coupon-input"
                          type="text"
                          placeholder="OGSAVE or OG20"
                          value={couponCode}
                          onChange={(event) =>
                            setCouponCode(event.target.value)
                          }
                          disabled={couponApplied}
                        />
                        <button
                          className="coupon-btn"
                          type="button"
                          onClick={applyCoupon}
                          disabled={couponApplied}
                        >
                          {couponApplied ? "Applied" : "Apply"}
                        </button>
                      </div>
                      {couponMessage && (
                        <p
                          className={`coupon-message ${couponApplied ? "success" : ""}`}
                        >
                          {couponMessage}
                        </p>
                      )}
                    </div>

                    <div className="checkout-section">
                      <h3>Shipping Address</h3>
                      <div className="form-grid">
                        <label className="input-group">
                          Full Name
                          <input
                            type="text"
                            value={shipping.fullName}
                            onChange={(event) =>
                              handleShippingChange(
                                "fullName",
                                event.target.value,
                              )
                            }
                            placeholder="Aria Thomas"
                          />
                        </label>
                        <label className="input-group">
                          Street Address
                          <input
                            type="text"
                            value={shipping.street}
                            onChange={(event) =>
                              handleShippingChange("street", event.target.value)
                            }
                            placeholder="123 OG Lane"
                          />
                        </label>
                        <label className="input-group">
                          City
                          <input
                            type="text"
                            value={shipping.city}
                            onChange={(event) =>
                              handleShippingChange("city", event.target.value)
                            }
                            placeholder="Mumbai"
                          />
                        </label>
                        <label className="input-group">
                          State
                          <input
                            type="text"
                            value={shipping.state}
                            onChange={(event) =>
                              handleShippingChange("state", event.target.value)
                            }
                            placeholder="Maharashtra"
                          />
                        </label>
                        <label className="input-group">
                          PIN / ZIP
                          <input
                            type="text"
                            value={shipping.zip}
                            onChange={(event) =>
                              handleShippingChange("zip", event.target.value)
                            }
                            placeholder="400001"
                          />
                        </label>
                        <label className="input-group">
                          Phone
                          <input
                            type="text"
                            value={shipping.phone}
                            onChange={(event) =>
                              handleShippingChange("phone", event.target.value)
                            }
                            placeholder="+91 98765 43210"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="payment-options">
                      <p>Payment Options</p>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="credit"
                          checked={paymentMethod === "credit"}
                          onChange={() => setPaymentMethod("credit")}
                        />
                        Credit / Debit Card
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={() => setPaymentMethod("upi")}
                        />
                        UPI
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="payment"
                          value="cod"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                        />
                        Cash on Delivery
                      </label>
                    </div>

                    {paymentMethod === "credit" && (
                      <div className="payment-form">
                        <label className="input-group">
                          Name on Card
                          <input
                            type="text"
                            value={paymentDetails.nameOnCard}
                            onChange={(event) =>
                              handlePaymentChange(
                                "nameOnCard",
                                event.target.value,
                              )
                            }
                            placeholder="Aria Thomas"
                          />
                        </label>
                        <label className="input-group">
                          Card Number
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={19}
                            value={paymentDetails.cardNumber}
                            onChange={(event) =>
                              handlePaymentChange(
                                "cardNumber",
                                event.target.value,
                              )
                            }
                            placeholder="1234 5678 9012 3456"
                          />
                        </label>
                        <div className="form-row">
                          <label className="input-group">
                            Expiry
                            <input
                              type="text"
                              maxLength={5}
                              value={paymentDetails.expiry}
                              onChange={(event) =>
                                handlePaymentChange(
                                  "expiry",
                                  event.target.value,
                                )
                              }
                              placeholder="MM/YY"
                            />
                          </label>
                          <label className="input-group">
                            CVC
                            <input
                              type="text"
                              inputMode="numeric"
                              maxLength={4}
                              value={paymentDetails.cvc}
                              onChange={(event) =>
                                handlePaymentChange("cvc", event.target.value)
                              }
                              placeholder="123"
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="payment-form">
                        <label className="input-group">
                          UPI ID
                          <input
                            type="text"
                            value={paymentDetails.upiId}
                            onChange={(event) =>
                              handlePaymentChange("upiId", event.target.value)
                            }
                            placeholder="aria@okaxis"
                          />
                        </label>
                      </div>
                    )}

                    {paymentMethod === "cod" && (
                      <p className="cod-note">
                        Pay in cash when your package is delivered. Keep your
                        PIN ready.
                      </p>
                    )}

                    {checkoutError && (
                      <p className="checkout-error">{checkoutError}</p>
                    )}

                    <div className="checkout-actions">
                      <button
                        className="btn primary checkout-btn"
                        type="button"
                        onClick={() => setInvoiceGenerated(true)}
                      >
                        Generate Invoice
                      </button>
                      <button
                        className="btn outline confirm-btn"
                        type="button"
                        onClick={handleConfirmOrder}
                        disabled={!confirmEnabled || isSubmitting}
                      >
                        {isSubmitting ? "Placing Order..." : "Confirm Order"}
                      </button>
                    </div>
                  </div>

                  {invoiceGenerated && (
                    <div className="invoice-card">
                      <h3>Invoice</h3>
                      <p>
                        Payment:{" "}
                        {paymentMethod === "credit"
                          ? "Card"
                          : paymentMethod === "upi"
                            ? "UPI"
                            : "COD"}
                      </p>
                      <div className="invoice-row">
                        <span>Subtotal</span>
                        <span>₹{subtotal.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="invoice-row">
                        <span>Discount</span>
                        <span>-₹{discountValue.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="invoice-row">
                        <span>Delivery</span>
                        <span>Free</span>
                      </div>
                      <div className="invoice-row invoice-total">
                        <strong>Total Payable</strong>
                        <strong>₹{totalPayable.toLocaleString("en-IN")}</strong>
                      </div>
                      <p className="invoice-note">
                        Once your order is confirmed, you will be redirected to
                        complete payment.
                      </p>
                    </div>
                  )}
                </aside>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <h3>Your cart is empty.</h3>
              <button onClick={() => onNavigate("shop")}>Shop Products</button>
            </div>
          )}
        </section>
      )}

      {page === "archive" && (
        <section className="route-section archive-grid">
          {archiveCards.map((card) => (
            <button
              key={card.title}
              onClick={() => onToast(`${card.title} archive opened.`)}
              onMouseEnter={(event) => {
                const video = event.currentTarget.querySelector("video");
                if (video) {
                  video.play().catch(() => {});
                }
              }}
              onMouseLeave={(event) => {
                const video = event.currentTarget.querySelector("video");
                if (video) {
                  video.pause();
                  video.currentTime = 0;
                }
              }}
            >
              <div className="archive-media">
                <img src={card.image} alt={card.title} />
                <video src={card.video} muted loop playsInline preload="auto" />
              </div>
              <span>OG</span>
              <h3>{card.title}</h3>
            </button>
          ))}
        </section>
      )}

      {page === "about" && (
        <section className="route-section about-panel">
          <div className="about-hero">
            <div className="about-logo-wrap">
              <div className="about-logo-glow" aria-hidden="true" />
              <img
                className="about-logo"
                src="/images/brand/og-logo.png"
                alt="The OG"
              />
            </div>

            <div className="about-copy">
              <p className="about-eyebrow">Original. Authentic. OG.</p>
              <h2>Built for those who lead, not follow.</h2>
              <p>
                OG Street Wear brings premium street style to your rotation with
                bold graphics, signature fits, and limited-run drops. Discover
                the collection made for people who craft culture instead of
                copying it.
              </p>
              <div className="about-actions">
                <button
                  className="btn primary"
                  onClick={() => onNavigate("shop")}
                >
                  Shop the Drop
                </button>
                <button
                  className="btn outline"
                  onClick={() => onNavigate("collections")}
                >
                  Explore Collections
                </button>
              </div>
            </div>
          </div>

          <div className="about-highlights">
            <div>
              <h3>Legendary Drops</h3>
              <p>
                Limited releases that sell out fast. Stay ahead of the culture
                curve.
              </p>
            </div>
            <div>
              <h3>Modern Heritage</h3>
              <p>
                OG branding fused with street-ready silhouettes for daily wear
                and statement fits.
              </p>
            </div>
            <div>
              <h3>Shop with Confidence</h3>
              <p>
                Track wishlist favorites, add to cart instantly, and build a
                curated OG wardrobe.
              </p>
            </div>
          </div>
        </section>
      )}

      <NewsletterSection onToast={onToast} />
    </>
  );
}
