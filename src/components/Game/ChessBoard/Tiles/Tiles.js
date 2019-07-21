import React from 'react';

const length = 8; 
const list = Array.apply(null, {length: length}).map(Number.call, Number);

const Tiles = () => (
  <ul className="tiles">
    {
      list.map((i) => {
        return (
          <li key={i}>
            <ul>
              {
                list.map((i) => {
                  return (
                    <li key={i}></li>
                  )
                })
              }
            </ul>
          </li>
        )
      })
    }
  </ul>
)

export default Tiles;