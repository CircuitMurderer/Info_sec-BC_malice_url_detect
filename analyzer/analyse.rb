require 'optparse'

class ThugAnalyser
  def initialize(option)
    @docker_base = 'docker run --rm'
    @thug_docker = ' remnux/thug'
    @file_path = ''

    @path = ' ' + option[:url] if option.has_key?(:url)
    if option.has_key?(:file)
      @path = ' -l ' + option[:file]
      path_arr = option[:file].split('/')
      parent_path = path_arr[0, path_arr.length - 1].join('/')
      @file_path = ' -v ' + parent_path + ':' + parent_path
    end

    @log_dir = ' -v /home/fluid/logs:/tmp/thug/logs'
    @log_dir = ' -v ' + option[:log] + ':/tmp/thug/logs' if option.has_key?(:log)
  end

  def concat_command
    @docker_base + @log_dir + @file_path + @thug_docker + ' -F -Z -u win7chrome49' + ' -v' + @path
  end

  def analyse
    cmd = concat_command
    puts 'Command: ', cmd
    `#{cmd}`
  end
end

options = {}
opt_parser = OptionParser.new do |opt|
  opt.banner = "Web Analyser by thug on Docker. \n"
  opt.banner += "Please ensure that you have installed the environment.\n"

  opt.separator ''
  opt.separator 'If you want to install the environment, run these:'
  opt.separator "\tsudo apt install docker.io"
  opt.separator "\tdocker pull remnux/thug"
  opt.separator ''
  opt.separator 'Parameters: (use the complete path)'

  opt.on('-u Url', '--url URL', 'Set the URL.') do |val|
    options[:url] = val
  end

  opt.on('-f File', '--file FILE', 'Set the local file path.') do |val|
    options[:file] = val
  end

  opt.on('-l Log', '--log LOG', 'Set the log file path.') do |val|
    options[:log] = val
  end

  opt.on_tail('-h', '--help', 'Show the help.') do
    puts opt
    exit
  end
end

opt_parser.parse!(ARGV)
analyser = ThugAnalyser.new(options)
puts 'Analysing: ' + options.inspect
analyser.analyse
