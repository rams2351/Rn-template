import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

// --- COMPONENTS ---
import { Button } from '@/components/Button';
import { Card } from '@/components/Card'; // ✅ NEW
import { Checkbox } from '@/components/Checkbox/Checkbox'; // ✅ NEW
import { DatePicker } from '@/components/Input/DatePicker';
import { Menu } from '@/components/Menu';
import { Modal } from '@/components/Modal';
import { Select } from '@/components/Select/Select';
import { Switch } from '@/components/Switch/Switch'; // ✅ NEW
import { Text } from '@/components/Text';

// --- FORM MOLECULES ---
import { FormCheckbox } from '@/components/Checkbox/FormCheckbox'; // ✅ NEW
import { FormDatePicker } from '@/components/Input/FormDatePicker';
import { FormSelect } from '@/components/Select/FormSelect';
import { FormSwitch } from '@/components/Switch/FormSwitch'; // ✅ NEW

// --- THEME & UTILS ---
import { FormTextInput, TextInput } from '@/components/Input';
import { Row } from '@/components/Row';
import { useTheme } from '@/theme/ThemeProvider';
import { scaler, showSuccessMsg } from '@/utils/helpers';
import Icon from 'react-native-vector-icons/Feather';

// ----------------------------------------------------------------------
// 1. VALIDATION SCHEMA
// ----------------------------------------------------------------------
const formSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.string({ error: 'Role is required' }).min(1, 'Role is required'),
  birthday: z.date({ error: 'Birthday is required' }),
  notifications: z.boolean(), // ✅ Switch
  terms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms', // ✅ Checkbox
  }),
});

type FormData = z.infer<typeof formSchema>;

// ----------------------------------------------------------------------
// 2. TABS
// ----------------------------------------------------------------------

const FormsTab = () => {
  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      role: '',
      birthday: undefined,
      notifications: true,
      terms: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [atomValues, setAtomValues] = useState({
    input: '',
    select: '',
    date: new Date(),
    check: false,
    switch: false,
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert('Form Submitted', JSON.stringify(data, null, 2));
      reset();
    }, 1500);
  };

  const updateAtom = (key: string, val: any) =>
    setAtomValues(prev => ({ ...prev, [key]: val }));

  return (
    <View>
      {/* SECTION A: ATOMS */}
      <View style={styles.section}>
        <Text style={styles.header}>1. Atoms (Stateless)</Text>

        <Card variant="ghost" contentStyle={{ gap: 10 }}>
          <TextInput
            label="Input"
            placeholder="Type..."
            value={atomValues.input}
            onChangeText={v => updateAtom('input', v)}
          />
          <Select
            label="Select"
            value={atomValues.select}
            onChange={v => updateAtom('select', v.value)}
            data={[
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
            ]}
          />
          <DatePicker
            label="Date"
            value={atomValues.date}
            onChange={v => updateAtom('date', v)}
          />
          <View style={styles.row}>
            <View style={{ flex: 1 }}>
              <Checkbox
                label="Checkbox Atom"
                value={atomValues.check}
                onValueChange={v => updateAtom('check', v)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Switch
                label="Switch Atom"
                value={atomValues.switch}
                onValueChange={v => updateAtom('switch', v)}
              />
            </View>
          </View>
        </Card>
      </View>

      {/* SECTION B: MOLECULES */}
      <View style={styles.section}>
        <Text style={styles.header}>2. Smart Form (Validation)</Text>
        <Text style={styles.subHeader}>
          Try submitting without filling fields
        </Text>

        <Card>
          <FormTextInput
            control={control}
            name="email"
            label="Email"
            placeholder="user@example.com"
            autoCapitalize="none"
          />
          <FormTextInput
            control={control}
            name="password"
            label="Password"
            placeholder="••••••"
            secureTextEntry
          />
          <FormSelect
            control={control}
            name="role"
            label="Role"
            data={[
              { label: 'Admin', value: 'admin' },
              { label: 'User', value: 'user' },
            ]}
          />
          <FormDatePicker control={control} name="birthday" label="Birthday" />

          <View style={{ marginVertical: 10 }}>
            <FormSwitch
              control={control}
              name="notifications"
              label="Enable Notifications"
            />
            <FormCheckbox
              control={control}
              name="terms"
              label="I agree to Terms & Conditions"
            />
          </View>

          <Button
            title="Submit Form"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            fullWidth
            style={{ marginTop: 10 }}
          />
        </Card>
      </View>
    </View>
  );
};

const UiElementsTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'center' | 'bottom'>('center');
  const { colors } = useTheme();

  return (
    <View>
      {/* 1. BUTTONS */}
      <View style={styles.section}>
        <Text style={styles.header}>Buttons</Text>
        <View style={styles.row}>
          <Button title="Primary" style={styles.flex1} />
          <Button title="Secondary" variant="secondary" style={styles.flex1} />
        </View>
        <View style={styles.row}>
          <Button title="Outline" variant="outline" style={styles.flex1} />
          <Button
            title="Destructive"
            variant="destructive"
            style={styles.flex1}
          />
        </View>
      </View>

      {/* 2. CARDS */}
      <View style={styles.section}>
        <Text style={styles.header}>Cards</Text>

        <Card
          title="Project Alpha"
          description="Last updated 2 mins ago"
          rightAction={
            <Menu align="right">
              {({ close }) => (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Edit');
                      close();
                    }}
                    style={{ padding: 10 }}
                  >
                    <Text>Edit Project</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('Del');
                      close();
                    }}
                    style={{ padding: 10 }}
                  >
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </TouchableOpacity>
                </>
              )}
            </Menu>
          }
          footer={
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 10,
              }}
            >
              <Button title="View Details" size="sm" variant="outline" />
              <Button title="Open" size="sm" />
            </View>
          }
        >
          <Text style={{ lineHeight: 20 }}>
            This is an elevated card component. It can hold any content, graphs,
            or lists. It uses the Menu component in the header.
          </Text>
        </Card>
      </View>

      {/* 3. MODALS */}
      <View style={styles.section}>
        <Text style={styles.header}>Modals & Toasts</Text>
        <View style={styles.row}>
          <Button
            title="Popup Modal"
            onPress={() => {
              setModalType('center');
              setShowModal(true);
            }}
            style={styles.flex1}
          />
          <Button
            title="Bottom Sheet"
            variant="outline"
            onPress={() => {
              setModalType('bottom');
              setShowModal(true);
            }}
            style={styles.flex1}
          />
        </View>
        <Button
          title="Trigger Toast"
          variant="ghost"
          onPress={() => showSuccessMsg('Operation Successful!')}
          style={{ marginTop: 10 }}
        />
      </View>

      <Modal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        title={modalType === 'center' ? 'Confirmation' : 'Options'}
        // description="Please confirm your action."
        type={modalType}
      >
        <TextInput label="Confirm Password" secureTextEntry />
        <Button title="Confirm" onPress={() => setShowModal(false)} fullWidth />
      </Modal>
    </View>
  );
};

// ----------------------------------------------------------------------
// 3. MAIN SCREEN
// ----------------------------------------------------------------------
export const TestComponentsScreen = () => {
  const { colors, isDark, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'forms' | 'ui'>('forms');

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.headerContainer}>
        <Row justify="space-between">
          <Text style={styles.screenTitle}>Design System</Text>
          <Icon
            size={25}
            name={isDark ? 'sun' : 'moon'}
            style={{ borderRadius: 80, overflow: 'hidden' }}
            color={colors.foreground}
            onPress={toggleTheme}
          />
        </Row>
        <Text style={{ color: colors.mutedForeground }}>
          Component Library & Testing Ground
        </Text>
      </View>

      {/* Tabs */}
      <View
        style={[
          styles.tabContainer,
          {
            borderBottomWidth: scaler(1),
            borderBottomColor: colors.border,
            paddingBottom: scaler(15),
          },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'forms' && {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
            {},
          ]}
          onPress={() => setActiveTab('forms')}
        >
          <Text
            style={{
              color: activeTab === 'forms' ? '#fff' : colors.foreground,
              fontWeight: '600',
            }}
          >
            Forms & Inputs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'ui' && {
              backgroundColor: colors.primary,
              borderColor: colors.primary,
            },
          ]}
          onPress={() => setActiveTab('ui')}
        >
          <Text
            style={{
              color: activeTab === 'ui' ? '#fff' : colors.foreground,
              fontWeight: '600',
            }}
          >
            UI Elements
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        bottomOffset={50}
        keyboardShouldPersistTaps="handled"
      >
        {activeTab === 'forms' ? <FormsTab /> : <UiElementsTab />}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    padding: scaler(20),
    paddingBottom: scaler(15),
  },
  screenTitle: { fontSize: scaler(28), fontWeight: '800', marginBottom: 5 },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: scaler(20),
    marginBottom: scaler(10),
    gap: scaler(10),
  },
  tab: {
    paddingVertical: scaler(8),
    paddingHorizontal: scaler(16),
    borderRadius: scaler(20),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  scrollContent: { padding: scaler(20), paddingBottom: scaler(50) },
  section: { marginBottom: scaler(30) },
  header: { fontSize: scaler(18), fontWeight: '700', marginBottom: scaler(8) },
  subHeader: { fontSize: scaler(14), marginBottom: scaler(16), opacity: 0.6 },
  row: { flexDirection: 'row', gap: scaler(10), marginBottom: scaler(10) },
  flex1: { flex: 1 },
});
