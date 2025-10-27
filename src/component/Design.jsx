import { useEffect } from 'react';
import './Design.css';

const Design = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.body.classList.remove('not-loaded');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="night"></div>
      <div className="flowers">
        {/* Flower 1 */}
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 2 */}
        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Flower 3 */}
        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__light flower__light--${i + 1}`}></div>
            ))}
          </div>
          <div className="flower__line">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Long grass */}
        <div className="grow-ans" style={{ '--d': '1.2s' }}>
          <div className="flower__g-long">
            <div className="flower__g-long__top"></div>
            <div className="flower__g-long__bottom"></div>
          </div>
        </div>

        {/* Grass 1 */}
        <div className="growing-grass">
          <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        {/* Grass 2 */}
        <div className="growing-grass">
          <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>
            ))}
            <div className="flower__grass__overlay"></div>
          </div>
        </div>

        {/* Right grass elements */}
        <div className="grow-ans" style={{ '--d': '2.4s' }}>
          <div className="flower__g-right flower__g-right--1">
            <div className="leaf"></div>
          </div>
        </div>

        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-right flower__g-right--2">
            <div className="leaf"></div>
          </div>
        </div>

        {/* Front grass */}
        <div className="grow-ans" style={{ '--d': '2.8s' }}>
          <div className="flower__g-front">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}>
                <div className="flower__g-front__leaf"></div>
              </div>
            ))}
            <div className="flower__g-front__line"></div>
          </div>
        </div>

        {/* Front right grass */}
        <div className="grow-ans" style={{ '--d': '3.2s' }}>
          <div className="flower__g-fr">
            <div className="leaf"></div>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`}></div>
            ))}
          </div>
        </div>

        {/* Long grass groups */}
        {[...Array(8)].map((_, groupIndex) => (
          <div key={groupIndex} className={`long-g long-g--${groupIndex}`}>
            {[
              { d: groupIndex === 0 ? '3s' : groupIndex === 6 ? '4.2s' : groupIndex === 7 ? '3s' : '4s', leaf: 0 },
              { d: groupIndex === 0 ? '2.2s' : groupIndex === 6 ? '4.4s' : groupIndex === 7 ? '3.2s' : '4.2s', leaf: 1 },
              { d: groupIndex === 0 ? '3.4s' : groupIndex === 1 ? '4s' : groupIndex === 6 ? '4.6s' : groupIndex === 7 ? '3.5s' : '3s', leaf: 2 },
              { d: groupIndex === 0 ? '3.6s' : groupIndex === 1 ? '4.2s' : groupIndex === 6 ? '4.8s' : '3.6s', leaf: 3 }
            ].map((item, i) => (
              <div key={i} className="grow-ans" style={{ '--d': item.d }}>
                <div className={`leaf leaf--${item.leaf}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Design;