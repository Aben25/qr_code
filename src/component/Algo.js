import React from  "react";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Highlight,
  Configure,
  RefinementList,
  Panel,
  Pagination,
} from "react-instantsearch-dom";
import Hit from "./Hit";



const searchClient = algoliasearch(
  "5DGIE39UOX",
  "68998baf7f780eeee9f1569b3394911b"
);

export default function Algo({ setName, setUrl }) {
  return (
    <div>
      <InstantSearch searchClient={searchClient} indexName="info">
        <Configure hitsPerPage={3} />
        <div className="search-panel">
          <div className="search-panel__filters">
            <Panel header="Search for contact information">
              <RefinementList attribute="Search for contact information" />
            </Panel>
          </div>

          <div className="search-panel__results">
            <SearchBox
              className="searchbox"
              translations={{
                placeholder: "",
              }}
            />
            <Hits hitComponent={Hit} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
