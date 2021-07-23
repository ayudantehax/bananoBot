# http://blade.nagaokaut.ac.jp/cgi-bin/scat.rb/ruby/ruby-talk/229068

# Below you'll find my solution.  The code to create the binary tree is
# pretty small.  The code to produce the text version of the tournament
# tree is not so small, however.  Oh well...

# Solution for Ruby Quiz #105
# Author: Eric I.
# December 10, 2006
# www.learnruby.com

class Numeric
  # A monkey-patched convenience method to compute the maximum of two
  # numbers.
  def max(other)
    if self >= other : self
    else other
    end
  end
end


class Integer
  # A monkey-patched method to compute the gray code of an integer.
  # The gray code has properties that make it helpful to the tournament problem.
  def gray_code
    self ^ (self >> 1)
  end
end


# A tournament is really a node in a binary tree.  The value in each
# node contains the ranking of the best ranking team contained in the
# tournament tree below.
class Tournament
  attr_reader :ranking

  def initialize(ranking)
    @ranking = ranking
  end

  # Creates a tournament with the given number of teams.
  def self.create(teams)
    # create the initial node
    head_node = Tournament.new(1)

    # insert additional nodes for each further team
    for ranking in 2..teams
      head_node.add_team(ranking)
    end

    head_node
  end

  # Adds a team with the given ranking to the tournament.  It turns out
  # that the gray code of the ranking-1 has a bit pattern that conveniently
  # helps us descend the binary tree to the appropriate place at which to
  # put the team.
  def add_team(ranking)
    add_team_help(ranking, (ranking - 1).gray_code)
  end

  # Returns the number of rounds in the tournament.  This is determined by
  # taking the max of the depths of the two sub-trees and adding one.
  def rounds
    unless @left : 0
    else 1 + (@left.rounds.max(@right.rounds))
    end
  end

  protected

  # Recursively descends the tree to place a team with a new ranking.
  # Ultimately it will create two new nodes and insert them into the
  # tree representing itself and the team to be played.  When
  # descending the three, the bits in the gray code of the ranking
  # from least-significant to most-significant indicate which branch
  # to take.
  def add_team_help(ranking, gray_code)
    if @left == nil
      # bottomed out; create two new nodes
      @left = Tournament.new(@ranking)
      @right = Tournament.new(ranking)
    elsif gray_code % 2 == 0
      # bit in gray code indicates the left branch
      @left.add_team_help(ranking, gray_code >> 1)
    else
      # bit in gray code indicates the right branch
      @right.add_team_help(ranking, gray_code >> 1)
    end
  end
end
