import styles from "./about.module.css";

function About() {
  return (
    <div className={styles.aboutWrapper}>

      {/* HERO */}
      <section className={styles.aboutHero}>
        <h1>About FoodRush</h1>
        <p>Delivering premium taste with speed, quality and passion.</p>
      </section>

      {/* WHO WE ARE */}
      <section className={styles.aboutSection}>
        <h2>Who We Are</h2>
        <p>
          FoodRush is not just a fast food brand, it is a complete food experience.
          We are built for people who love premium taste, fresh ingredients and
          fast service. Every meal we prepare is crafted with care, quality and
          consistency.
        </p>
        <p>
          From burgers to pizzas and from desserts to complete meals, FoodRush
          brings restaurant-quality food directly to your doorstep.
        </p>
      </section>

      {/* OUR STORY */}
      <section className={styles.aboutSectionAlt}>
        <h2>Our Story</h2>
        <p>
          FoodRush started with one clear vision: to change how fast food is
          experienced. We wanted to remove the idea that fast food has to be cheap
          or average. Instead, we created a brand where speed meets quality and
          taste meets luxury.
        </p>
        <p>
          Every recipe is tested, refined and perfected to make sure customers
          get the same premium experience every time they order.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.missionVision}>
        <div className={styles.missionBox}>
          <h2>Our Mission</h2>
          <ul>
            <li>Deliver premium quality food</li>
            <li>Ensure fast and reliable service</li>
            <li>Maintain consistency and hygiene</li>
            <li>Provide unforgettable taste experience</li>
          </ul>
        </div>

        <div className={styles.visionBox}>
          <h2>Our Vision</h2>
          <p>
            We see FoodRush as a future leading food brand that represents quality,
            consistency and customer satisfaction. We don’t just want customers,
            we want loyal food lovers.
          </p>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className={styles.whyChooseUs}>
        <h2>Why Choose FoodRush?</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h3>🍔 Premium Ingredients</h3>
            <p>
              We use only the freshest and finest ingredients to ensure rich taste
              and perfect texture in every bite.
            </p>
          </div>

          <div className={styles.card}>
            <h3>⚡ Fast & Reliable Delivery</h3>
            <p>
              Your food arrives hot, fresh and right on time because your time
              matters to us.
            </p>
          </div>

          <div className={styles.card}>
            <h3>⭐ Trusted Quality</h3>
            <p>
              Hygiene, quality control and taste consistency are our top
              priorities.
            </p>
          </div>

          <div className={styles.card}>
            <h3>👨‍🍳 Expert Recipes</h3>
            <p>
              Every item is designed by professionals to give restaurant-level
              flavor.
            </p>
          </div>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className={styles.aboutEnd}>
        <h2>FoodRush – Where Premium Taste Meets Fast Delivery.</h2>
        <p>
          We don’t just serve food, we serve an experience.
        </p>
      </section>

    </div>
  );
}

export default About;
