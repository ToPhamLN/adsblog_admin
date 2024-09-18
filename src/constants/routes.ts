import React from 'react'

const Blogs = React.lazy(() => import('../pages/Blogs'))
const BlogInfo = React.lazy(() => import('../pages/BlogInfo'))
const BlogCreate = React.lazy(() => import('../pages/BlogCreate'))
const BlogEdit = React.lazy(() => import('../pages/BlogEdit'))
const Categories = React.lazy(() => import('../pages/Categories'))
const CategoryCreate = React.lazy(() => import('../pages/CategoryCreate'))
const Dashboard = React.lazy(() => import('../pages/Dashboard'))
const Setting = React.lazy(() => import('../pages/Setting'))
const Users = React.lazy(() => import('../pages/Users'))
const CategoryEdit = React.lazy(() => import('../pages/CategoryEdit'))

export const pathRouter = {
  blogs: '/blogs',
  blogInfo: '/blogs/:_id',
  blogCreate: '/blogs/create',
  blogEdit: '/blogs/edit/:_id',
  categories: '/categories',
  categoryCreate: '/categories/create',
  categoryEdit: '/categories/edit/:_id',
  dashboard: '/',
  setting: '/settings',
  users: '/users'
}

export const routes: {
  path: string
  component: React.ComponentType
}[] = [
  {
    path: pathRouter.blogs,
    component: Blogs
  },
  {
    path: pathRouter.blogInfo,
    component: BlogInfo
  },
  {
    path: pathRouter.blogCreate,
    component: BlogCreate
  },
  {
    path: pathRouter.blogEdit,
    component: BlogEdit
  },
  {
    path: pathRouter.categories,
    component: Categories
  },
  {
    path: pathRouter.categoryCreate,
    component: CategoryCreate
  },
  {
    path: pathRouter.categoryEdit,
    component: CategoryEdit
  },
  {
    path: pathRouter.dashboard,
    component: Dashboard
  },
  {
    path: pathRouter.setting,
    component: Setting
  },
  {
    path: pathRouter.users,
    component: Users
  }
]

export const menuLinks: {
  name: string
  path: string
}[] = [
  {
    name: 'Dashboard',
    path: pathRouter.dashboard
  },
  {
    name: 'Blogs',
    path: pathRouter.blogs
  },
  {
    name: 'Categories',
    path: pathRouter.categories
  }
  // {
  //   name: 'Users',
  //   path: pathRouter.users
  // },
  // {
  //   name: 'Settings',
  //   path: pathRouter.setting
  // }
]
