import React from "react";
import ct from "./container.module.css";

const Container = () => {
  return (
    <div className={`${ct.page}`}>
      <div className={`${ct.layout}`}>
        <main>
          <h1>main</h1>
        </main>
        <article>
          <h1>article</h1>
        </article>
      </div>
    </div>
  );
};

export default Container;
