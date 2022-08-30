// H5 页面路由配置

module.exports = {
  pages: ['pages/demo/index', 'pages/error/index'],
  tabBar: {
    color: '#595959',
    selectedColor: '#004285',
    backgroundColor: '#fff',
    list: [
      {
        pagePath: 'h5/job/index/index',
        text: '职位',
        iconPath: 'assets/imgs/tabBar/job.png',
        selectedIconPath: 'assets/imgs/tabBar/job-selected.png',
      },
      {
        pagePath: 'h5/resume/index/index',
        text: '简历',
        iconPath: 'assets/imgs/tabBar/resume.png',
        selectedIconPath: 'assets/imgs/tabBar/resume-selected.png',
      },
      {
        pagePath: 'h5/my/index/index',
        text: '我的',
        iconPath: 'assets/imgs/tabBar/my.png',
        selectedIconPath: 'assets/imgs/tabBar/my-selected.png',
      },
    ],
  },
}
