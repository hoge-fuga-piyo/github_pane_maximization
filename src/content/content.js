console.log('hogehoge');

if($('div').hasClass('repository-content')) {
  console.log("has repository-content");
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-left', '2%');
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('margin-right', '2%');
  $('div.container-lg.clearfix.new-discussion-timeline.experiment-repo-nav.p-responsive').css('max-width', '100%');
  $('div.repository-content').width('auto');
}