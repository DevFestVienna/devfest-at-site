task default: %w[css js jekyll json]

task :css do
  Dir.chdir('_sass') do
    system "bundle exec compass compile -c config.rb -e production"
  end
end

task :js do
  Dir.chdir('automation/minifying') do
    system "sh ./minify_js.sh"
  end
end

task :json do
  system "node automation/json/mobile.js"
  system "node automation/json/firebase.js"
end

task :jekyll do
  system "bundle exec jekyll build"
end

task :server do
  system "bundle exec jekyll serve"
end
