import React, { Component } from 'react';
import SortableTree, { addNodeUnderParent, removeNodeAtPath } from 'react-sortable-tree';

import myData from './data.json';

console.log(myData);

export default class KeywordSearchTree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: '',
      searchFocusIndex: 0,
      searchFoundCount: null,
      treeData: myData,
      savedNode: ''
    };
  }

  render() {
    const { searchString, searchFocusIndex, searchFoundCount } = this.state;

    // Case insensitive search of `node.title`
    const customSearchMethod = ({ node, searchQuery }) =>
      searchQuery &&
      node.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1;

    const selectPrevMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
            : searchFoundCount - 1,
      });

    const selectNextMatch = () =>
      this.setState({
        searchFocusIndex:
          searchFocusIndex !== null
            ? (searchFocusIndex + 1) % searchFoundCount
            : 0,
      });

    const getNodeKey = ({ treeIndex }) => treeIndex;
    const getRandomName = () =>
      "New Name";
    
      return (
      <div>
        <h2>Keyword organizer</h2>
        <form
          style={{ display: 'inline-block' }}
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <input
            id="find-box"
            type="text"
            placeholder="Search..."
            style={{ fontSize: '1rem' }}
            value={searchString}
            onChange={event =>
              this.setState({ searchString: event.target.value })
            }
          />

          <button
            type="button"
            disabled={!searchFoundCount}
            onClick={selectPrevMatch}
          >
            &lt;
          </button>

          <button
            type="submit"
            disabled={!searchFoundCount}
            onClick={selectNextMatch}
          >
            &gt;
          </button>

          <span>
            &nbsp;
            {searchFoundCount > 0 ? searchFocusIndex + 1 : 0}
            &nbsp;/&nbsp;
            {searchFoundCount || 0}
          </span>
        </form>

        <p>Cutted node: {this.state.savedNode}</p>

        <div style={{ height: 800 }}>
          <SortableTree
            treeData={this.state.treeData}
            onChange={treeData => this.setState({ treeData })}
            //
            // Custom comparison for matching during search.
            // This is optional, and defaults to a case sensitive search of
            // the title and subtitle values.
            // see `defaultSearchMethod` in https://github.com/frontend-collective/react-sortable-tree/blob/master/src/utils/default-handlers.js
            searchMethod={customSearchMethod}
            //
            // The query string used in the search. This is required for searching.
            searchQuery={searchString}
            //
            // When matches are found, this property lets you highlight a specific
            // match and scroll to it. This is optional.
            searchFocusOffset={searchFocusIndex}
            //
            // This callback returns the matches from the search,
            // including their `node`s, `treeIndex`es, and `path`s
            // Here I just use it to note how many matches were found.
            // This is optional, but without it, the only thing searches
            // do natively is outline the matching nodes.
            searchFinishCallback={matches =>
              this.setState({
                searchFoundCount: matches.length,
                searchFocusIndex:
                  matches.length > 0 ? searchFocusIndex % matches.length : 0,
              })
            }
            generateNodeProps={({ node, path }) => ({
              buttons: [
                <button
                  onClick={() =>
                    this.setState(state => ({
                      treeData: addNodeUnderParent({
                        treeData: state.treeData,
                        parentKey: path[path.length - 1],
                        expandParent: true,
                        getNodeKey,
                        newNode: {
                          title: this.state.savedNode,
                        },
                        addAsFirstChild: state.addAsFirstChild,
                      }).treeData,
                    }))
                  }
                >
                  Paste as Child
                </button>,
                <button
                  onClick={() => {
                    this.setState(state => ({
                      treeData: removeNodeAtPath({
                        treeData: state.treeData,
                        path,
                        getNodeKey,
                      }),
                    }));
                    this.setState({savedNode:node.title});
                    console.log(node.title);
                    console.log(path);
                    console.log(path[path.length-1]);
                  }
                  }
                >
                  Cut
                </button>,
              ],
            })}

          />
        <button
          onClick={() =>
            this.setState(state => ({
              treeData: state.treeData.concat({
                title: `${getRandomName()}`,
              }),
            }))
          }
        >
          Add node
        </button>
        </div>
      </div>
    );
  }
}
