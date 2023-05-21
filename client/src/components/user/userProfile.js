import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import Layout from '../basic/layout'
import Sidebar from './sidebar'
import { useGlobalContext } from '../context/context'

const UserProfile = () => {

  const {auth} = useGlobalContext()

  return (
    <Layout title="UserProfile - Ecommerce App">
      <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
              <div>
                <div>
                  <h3 className="my-4"><strong>UserProfile</strong></h3>
                  <section class="profile">
                    <header class="header">
                      <div class="details">
                        <img src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=b38c22a46932485790a3f52c61fcbe5a" alt="John Doe" class="profile-pic"/>
                        <h1 class="heading">{auth?.user?.Name}</h1>
                        <div class="location">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12 ,2Z"></path>
                          </svg>
                          <p>Qanchi,Pakistan Lahore</p>
                        </div>
                        <div class="stats">
                          <div class="col-4">
                            <h4>20</h4>
                            <p>Reviews</p>
                          </div>
                          <div class="col-4">
                            <h4>10</h4>
                            <p>Communities</p>
                          </div>
                          <div class="col-4">
                            <h4>100</h4>
                            <p>Discussions</p>
                          </div>
                        </div>
                      </div>
                    </header>
                  </section>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default UserProfile
