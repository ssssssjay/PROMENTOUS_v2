import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/project/recruit",
    name: "projectRecruit",
    component: () =>
      import(
        /* webpackChunkName: "projectRecruit" */ "../views/ProjectRecruitView.vue"
      )
  },
  {
    path: "/project/review",
    name: "projectReview",
    component: () =>
      import(
        /* webpackChunkName: "projectReview" */ "../views/ProjectReviewView.vue"
      )
  },
  {
    path: "/mentolist",
    name: "mentolist",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mentolist" */ "../views/MentoListView.vue")
  },
  {
    path: "/project/recruit/:projectId",
    name: "projectdetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "projectdetail" */ "../views/ProjectDetailView.vue"
      )
  },
  {
    path: "/project/review/:reviewId",
    name: "reviewdetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "reviewdetail" */ "../views/ReviewDetailView.vue"
      )
  },
  {
    path: "/mypageinfo/:userId",
    name: "MyPageView",
    // route level code-splittingd
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/MyPageView.vue")
  },
  {
    path: "/MentoringAdmin",
    name: "MentoringAdmin",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/MentoringAdminView.vue")
  },
  {
    path: "/teamManage",
    name: "teamManage",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/TeamManageView.vue")
  },
  {
    path: "/Recruitwrite",
    name: "Recruitwrite",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/RecruitWriteView.vue")
  },
  {
    path: "/Reviewwrite",
    name: "write",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/ReviewWriteView.vue")
  },
  {
    path: "/mentorregister",
    name: "MentoRegister",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../views/MentorRegisterView.vue")
  },
  {
    path: "/userprofile",
    name: "UserProfile",
    component: () =>
      import(/* webpackChunkName: "mypage" */ "../components/UserProfile.vue")
  },
  {
    path: "/mentoringapply",
    name: "MentoringApply",
    component: () =>
      import(
        /* webpackChunkName: "mypage" */ "../components/MentoringApply.vue"
      )
  },
  // {
  //   path: "/mentordetail",
  //   name: "MentorDetail",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "mentorDetail" */ "../views/MentorDetailView.vue"
  //     )
  // },
  {
    path: "/mentordetail/:mentorUserId",
    name: "MentorDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "mentorDetail" */ "../views/MentorDetailView.vue"
      )
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
