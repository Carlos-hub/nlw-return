import React, {useRef ,useState}from 'react';
import { View,TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler'
import { Sucess } from '../Sucess';
import { Options } from '../Options';
import { Form } from '../Form';



import { styles } from './style';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';


export type FeedbackTypes = keyof typeof feedbackTypes;


 function Widget() {

    const bottomSheetRef = useRef<BottomSheet>(null);
    function handleOpen(){
        bottomSheetRef.current?.expand();
    }
    const [feedbacktype,setFeedbacktype] = useState<FeedbackTypes | null > (null);
    const [feedbackSent, setFeedbackSent] = useState(false);
function handleRestartFeedback(){
  setFeedbacktype(null);
  setFeedbackSent(false);
}

function handleFeedbackSent(){
  setFeedbackSent(true);
}
  return (
    <>
        <TouchableOpacity 
        style={styles.button}
        onPress={handleOpen}
        >
            <ChatTeardropDots
            size={24}
            color={theme.colors.text_on_brand_color}
            />
        </TouchableOpacity>
        <BottomSheet
        ref={bottomSheetRef}
        snapPoints ={[1,280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
        >
            {
              feedbackSent ?
              <Sucess
              onSendAnotherFeedback={handleRestartFeedback}
              />
              :
              <>
                {
                  feedbacktype ?
                  <Form
                  feedbackType={feedbacktype}
                  onFeedbackCanceled={handleRestartFeedback}
                  onFeedbackSent={handleFeedbackSent}
                  />
                  :
                  <Options onFeedbackTypeChanged={setFeedbacktype} />
                } 
                </>
            }
            
        </BottomSheet>
    </>
  );
}

export default gestureHandlerRootHOC(Widget);