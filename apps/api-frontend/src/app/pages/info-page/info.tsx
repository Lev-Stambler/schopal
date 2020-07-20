import React from 'react';
import './info.css';

export default function InfoPage() {
  return (
    <div className="info">
      <h3>Info about Schopal</h3>
      <p>
        Schopal is a search engine for scholarly articles. which returns results <div className="bold">by paragraph</div> rather than by article. Thus, you may see the same article appear twice.
      </p>
      <p>
        "Why by paragraph?" you may ask. Scholarly articles are often long. People simply looking for certain claims, studies, or results can now spend a lot less time
        looking through lengthy articles. Rather, they can more immediately see if an article fits their needs.
      </p>
      <p>
        Currently Schopal supports the following research databases:
        <ul>
          <li>
            <a href="https://europepmc.org">Europe PMC</a>: a life science database
          </li>
          <li>
            <a href="https://arxiv.org/">Arxiv</a>: an open source archive of scholarly articles in STEM fields
          </li>
        </ul>
      </p>
    </div>
  );
}
