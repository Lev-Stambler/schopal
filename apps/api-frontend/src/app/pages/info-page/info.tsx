import React from 'react';
import './info.css';

export default function InfoPage() {
  return (
    <div className="info">
      <h3>Info about Schopal</h3>
      <p>
        Schopal is a search engine for Scholarly articles. Using open source APIs, Schopal finds scholarly articles, and then analyzes them according to your search.
        Schopal will then return results <div className="bold">by paragraph</div> rather than by article. Thus, you may see the same article appear twice.
      </p>
      <p>
        "Why by paragraph?" you may ask. Scholarly articles are often long. People simply looking for certain claims, studies, or results can now spend a lot less time
        looking through lengthy articles. Rather, they can more immediatly see if an article fits their needs.
      </p>
      <p>
        Currently Schopal supports the following research databases:
        <ul>
          <li>
            <a href="https://europepmc.org">Europe PMC</a>: a life science database
          </li>
        </ul>
      </p>
    </div>
  );
}
