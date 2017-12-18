'use strict';

const path = require('path');
const settings = new Object();

settings.projectPath = path.resolve(__dirname, '..');
settings.srcPath = path.resolve(settings.projectPath, 'app');
settings.buildPath = path.resolve(settings.projectPath,'dist');

settings.cdnDevelopment = "https://www.exampleurl.com";

settings.fileLoaderImages = /\.jpe?g$|\.gif$|\.png$/
settings.fileLoaderFonts = /\.svg$|\.eot$|\.woff$|\.woff2$|\.ttf/
settings.fileLoaderMedia = /\.wav$|\.mp3$|\.pvr$|\.webm$|\.mp4$|\.dds$|\.kml$/
settings.fileLoaderRegEx = /\.jpe?g$|\.gif$|\.png$|\.svg$|\.eot$|\.woff$|\.woff2$|\.ttf$|\.wav$|\.mp3$|\.pvr$|\.webm$|\.mp4$|\.dds$|\.kml$/

module.exports = settings;
