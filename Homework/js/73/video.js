/* global $ */

(async function () {
  'use strict';

  const videoList = $('#videos');
  const videoTitleElem = $('#title');
  const videoElem = $('#video');
  const videoElements = $('.has-videos');
  const noVideoElements = $('.no-video');
  const errorElem = $('.error');
  let videos = []; // ✅ Declare once here

  async function loadJson(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return response.json();
    } catch (e) {
      errorElem.text(e.message);
    }
  }

  async function selectVideo(e) {
    const selectedId = Number(e.target.value);
    const video = videos.find(v => v.id === selectedId);
    if (!video) return;

    noVideoElements.hide();
    videoElements.show();

    videoTitleElem.text(video.title);
    videoElem.attr('src', video.url);
  }

  videos = await loadJson('video.json'); // ✅ No const here
  videos?.forEach(video => {
    videoList.append(`<option value="${video.id}">${video.title}</option>`);
  });

  videoList.change(selectVideo);
}());