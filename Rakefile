task default: %w[css, js]

task :css do
  Dir.chdir('_sass') do
    bundle exec compass compile -c config.rb -e production
  end
end

task :js do
  Dir.chdir('automation/minifying') do
    sh minify_js.sh
  end
end
