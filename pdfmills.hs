{-# LANGUAGE GADTs #-}
{-# LANGUAGE ExistentialQuantification #-}
module Main where

-- Ignore this
main :: IO ()
main = return ()


data Font = Font String Int Int
data Text = Text String Font
newtype Space = Space Int
data Image = Image String Int Int

data Drawn a = Drawn

vertical :: BoundingBox -> Int
vertical (Box _ y _ h) = y + h 

class Drawable a where
  draw :: a -> Drawn a

-- Rules
-- * (width . draw) a == width a
-- * (height . draw) a ==  height a
class Drawable a => Element a where
  width :: BoundingBox -> a -> Int
  height :: BoundingBox -> a -> Int

class Element a => Layout a where
  boxes :: a -> [BoundingBox]

data BoundingBox = Box Int Int Int Int
data BasicLayout a where
  BlockLayout :: Element a => [a] -> BasicLayout a
  InlineLayout :: Element a  => [a] -> BasicLayout a

newtype FlexLayout a = FlexLayout [BasicLayout a]
newtype TableLayout a = TableLayout [FlexLayout a]