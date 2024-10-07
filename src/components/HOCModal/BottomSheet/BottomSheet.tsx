import React from "react";
import BottomSheet, { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { useAppTheme } from "hooks";
import createStyles from "./styles";

interface BottomSheetModalProps {
  isVisible: boolean;
  snapPoints: string[];
  bottomSheetRef: any;
  renderBackdrop: React.FC<BottomSheetBackdropProps>;
  children: React.ReactNode;
}

export const BottomSheetModal: React.FC<BottomSheetModalProps> = ({
  isVisible,
  bottomSheetRef,
  snapPoints,
  renderBackdrop,
  children,
}: React.PropsWithChildren<BottomSheetModalProps>) => {
  const { theme } = useAppTheme();
  const styles = createStyles(theme);

  return (
    <>
      {isVisible && (
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.bottomSheetStyle}
        >
          {children}
        </BottomSheet>
      )}
    </>
  );
};
