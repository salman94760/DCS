export default function Header() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header
      className="
        relative
        w-full
        h-[64px] sm:h-[70px] lg:h-[76px]
        flex items-center justify-between
        px-3 sm:px-4 lg:px-6
        overflow-hidden
        bg-gradient-to-r from-slate-900 via-[#17233d] to-[#1d2b49]
        border-b border-white/10
        shadow-[0_4px_20px_rgba(15,23,42,0.15)]
      "
    >
      {/* Decorative Stripes */}
      <div className="stripe-wrap absolute inset-y-0 left-0 pointer-events-none">
        <div className="stripe"></div>
        <div className="stripe two"></div>
      </div>

      {/* Company Info */}
      <div
        className="
          relative z-10
          flex items-center
          gap-2 sm:gap-3
          min-w-0
          max-w-[75%] sm:max-w-[80%] lg:max-w-none
        "
      >
        {/* Logo */}
        {user?.logo && (
          <div
            className="
              flex-shrink-0
              w-[42px] h-[42px]
              sm:w-[50px] sm:h-[50px]
              lg:w-[60px] lg:h-[60px]
              flex items-center justify-center
              overflow-hidden
            "
          >
            <img
              src={user.logo}
              alt="Company Logo"
              className="
                w-full h-full
                object-contain
              "
            />
          </div>
        )}

        {/* Company Name */}
        <div className="min-w-0">
          <p
            className="
              text-white
              font-extrabold
              text-[13px]
              sm:text-[15px]
              lg:text-lg
              leading-tight
              tracking-wide
              truncate
            "
            title={user?.company?.cname || ""}
          >
            {user?.company?.cname || ""}
          </p>

          {/* Optional subtitle */}
          <p className="hidden sm:block text-[10px] lg:text-xs text-slate-400 mt-0.5 truncate">
            Administration
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div
        className="
          relative z-10
          flex-shrink-0
          flex items-center
          gap-2 sm:gap-4 lg:gap-6
        "
      >
        {/* Future notification / profile area */}
      </div>
    </header>
  );
}
```

### Stripe CSS bhi responsive kar do

```css
.stripe-wrap {
  width: 130px;
}

.stripe {
  position: absolute;
  width: 32px;
  height: 105px;
  left: 12px;
  top: -20px;
  transform: rotate(28deg);
  background: linear-gradient(
    180deg,
    #6ee7b7 0%,
    #34d399 50%,
    #10b981 100%
  );
  border-radius: 4px;
  box-shadow: 0 4px 18px rgba(16, 185, 129, 0.15);
}

.stripe.two {
  left: 46px;
  background: linear-gradient(
    180deg,
    #a7f3d0,
    #34d399
  );
  opacity: 0.3;
}

@media (min-width: 640px) {
  .stripe-wrap {
    width: 160px;
  }

  .stripe {
    width: 38px;
    height: 115px;
    left: 18px;
    top: -22px;
  }

  .stripe.two {
    left: 56px;
  }
}

@media (min-width: 1024px) {
  .stripe-wrap {
    width: 180px;
  }

  .stripe {
    width: 42px;
    height: 125px;
    left: 22px;
    top: -25px;
  }

  .stripe.two {
    left: 64px;
  }
}