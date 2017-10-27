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
  system "npm install fs"
  system "npm install ent"
  system "npm install yamljs"
  system "npm install shelljs"
  system "node automation/json/mobile.js"
  system "node automation/json/firebase.js"
end

task :jekyll do
  system "bundle exec jekyll build"
end
