Page({
  data: {},
  onLoad() {},
  goToPage(e){
    const {page} = e.target.dataset;
    my.navigateTo({
      url: `/pages/three/${page}/index`
    });
  }
});
