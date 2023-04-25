import React from 'react';
import Navbar from '~/components/Navbar/navbar';
import './workspace.scss';
import { Link } from 'react-router-dom';
const Workspace = () => {
   return (
      <>
         <Navbar />
         <div className="workspace__wrapper">
            <div className="container">
               <section className="workspace__content">
                  <Link to="/board/2123" className="workspace__content-item">
                     <h2 className="workspace__content-heading">Recently visited</h2>
                     <div className="content__item-box">
                        <img
                           src="https://cdn.monday.com/images/quick_search_recent_board.svg"
                           alt=""
                           className="content__item-img"
                        />
                        <div className="content__item-title">
                           <div className="content__item-title--flex">
                              <svg
                                 viewBox="0 0 20 20"
                                 fill="currentColor"
                                 width="22"
                                 height="22"
                                 aria-hidden="true"
                                 aria-label="Public board"
                                 className="icon_component"
                              >
                                 <path
                                    d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z"
                                    fill="currentColor"
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                 ></path>
                              </svg>
                              <span>Board name</span>
                           </div>
                           <span className="content__item-title--desc">
                              work management &gt; Main workspace
                           </span>
                        </div>
                     </div>
                  </Link>

                  <Link to="/workspace/123" className="workspace__content-item">
                     <h2 className="workspace__content-heading">My workspaces</h2>
                     <div className="content__item-box workspace__item-flex">
                        <div className="content__item-icon">
                           <span>M</span>
                        </div>
                        <div className="workspace__item-title">
                           <span className="workspace__item-title--heading">Main workspace</span>
                           <span className="workspace__item-title--desc">work management</span>
                        </div>
                     </div>
                  </Link>
               </section>
            </div>
         </div>
      </>
   );
};

export default Workspace;
